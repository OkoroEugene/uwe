package com.uwe;

import android.content.Intent;
import android.support.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;

import kin.devplatform.Environment;
import kin.devplatform.Kin;
import kin.devplatform.KinCallback;
import kin.devplatform.KinEnvironment;
import kin.devplatform.base.Observer;
import kin.devplatform.data.model.Balance;
import kin.devplatform.data.model.OrderConfirmation;
import kin.devplatform.exception.ClientException;
import kin.devplatform.exception.KinEcosystemException;
import kin.devplatform.marketplace.model.NativeSpendOffer;

public class KinModule extends ReactContextBaseJavaModule {

    private Gson gson = new Gson();

    public KinModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "KinModule";
    }

    private KinEnvironment getEnvironment(String environment) {
        KinEnvironment environ;
        switch (environment) {
            case "production":
            case "PRODUCTION":
                environ = Environment.getProduction();
                break;
            default:
                environ = Environment.getPlayground();
                break;
        }
        return environ;
    }

    @ReactMethod
    public void start(@NonNull String jwt, @NonNull String environment, @NonNull Callback cb) {
        KinEnvironment environ = getEnvironment(environment);
        start(jwt, environ, cb);
    }

    private void start(@NonNull String jwt, KinEnvironment environment, final Callback cb) {
        Kin.enableLogs(true);
        Kin.start(getReactApplicationContext(), jwt, environment, new KinCallback<Void>() {
            @Override
            public void onResponse(Void response) {
                cb.invoke(null, "kin successfully started", environment.getBiUrl());
            }

            @Override
            public void onFailure(KinEcosystemException error) {
                cb.invoke(gson.toJson(new Error(error.getMessage(), error.getCause())), null, environment.getBiUrl());
            }
        });
    }

    @ReactMethod
    public void getCachedBalance(Callback cb) {
        try {
            Balance balance = Kin.getCachedBalance();
            cb.invoke(null, balance.getAmount().doubleValue());
        } catch (ClientException ex) {
            cb.invoke(gson.toJson(new Error(ex.getMessage(), ex.getCause())));
        }
    }

    @ReactMethod
    public void getBalance(Callback cb) {
        try {
            Kin.getBalance(new KinCallback<Balance>() {
                @Override
                public void onResponse(Balance balance) {
                    cb.invoke(null, balance.getAmount().doubleValue());
                }

                @Override
                public void onFailure(KinEcosystemException error) {
                    cb.invoke(gson.toJson(new Error(error.getMessage(), error.getCause())));
                }
            });
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void addBalanceListener(Callback cb) {
        Observer<Balance> balanceObserver = new Observer<Balance>() {
            @Override
            public void onChanged(Balance value) {
                cb.invoke(null, value.getAmount().doubleValue());
            }
        };
        try {
            Kin.addBalanceObserver(balanceObserver);
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void purchasePayment(String jwt, Callback cb) {
        try {
            Kin.purchase(jwt, new KinCallback<OrderConfirmation>() {
                @Override
                public void onResponse(OrderConfirmation response) {
                    cb.invoke(null, gson.toJson(new Status(response.getJwtConfirmation(), 200, response.getStatus().getValue())));
                }

                @Override
                public void onFailure(KinEcosystemException error) {
                    cb.invoke(gson.toJson(new Error(error.getMessage(), error.getCause())));
                }
            });
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void addToMarketPlace(String offerId, String offerTitle, String offerDescription, int offerAmount, String imageURL, Callback cb) {
        NativeSpendOffer spendOffer = new NativeSpendOffer(offerId)
                .title(offerTitle)
                .description(offerDescription)
                .amount(offerAmount)
                .image(imageURL);
        addNativeOfferClickedObserver(cb);
        try {
            if (Kin.addNativeOffer(spendOffer)) {
                cb.invoke(null, gson.toJson(spendOffer));
            } else {
                cb.invoke(gson.toJson(new Error("Could not add the native offer")));
            }
        } catch (ClientException error) {
            cb.invoke(gson.toJson(new Error(error.getMessage(), error.getCause())));
        }
    }

    private void addNativeOfferClickedObserver(Callback cb) {
        try {
            Kin.addNativeOfferClickedObserver(getNativeOfferClickedObserver(cb));
        } catch (ClientException e) {
            cb.invoke("Could not add native offer callback");
        }
    }

    private Observer<NativeSpendOffer> getNativeOfferClickedObserver(Callback cb) {
        Observer<NativeSpendOffer> nativeSpendOfferClickedObserver = new Observer<NativeSpendOffer>() {
            @Override
            public void onChanged(NativeSpendOffer value) {
                cb.invoke(null, gson.toJson(value));
            }
        };
        return nativeSpendOfferClickedObserver;
    }

    @ReactMethod
    public void removeFromMarketPlace(Callback cb) {
//        NativeSpendOffer spendOffer = Kin.na //method to get the native spend offer
    }

    @ReactMethod
    public void getOrderConfirmation(String offerId, Callback cb) {
        try {
            Kin.getOrderConfirmation(offerId, new KinCallback<OrderConfirmation>() {
                @Override
                public void onResponse(OrderConfirmation response) {
                    if (response.getStatus() == OrderConfirmation.Status.COMPLETED) {
                        String jwtConfirmation = response.getJwtConfirmation();
                        cb.invoke(null, jwtConfirmation);
                    } else {
                        cb.invoke(null, false);
                    }
                }

                @Override
                public void onFailure(KinEcosystemException error) {
                    cb.invoke(gson.toJson(new Error(error.getMessage(), error.getCause())));
                }
            });
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void requestPayment(String offerJwt, Callback cb) {
        try {
            Kin.requestPayment(offerJwt, new KinCallback<OrderConfirmation>() {
                @Override
                public void onResponse(OrderConfirmation orderConfirmation) {
                    cb.invoke(null, orderConfirmation.getJwtConfirmation());
                }

                @Override
                public void onFailure(KinEcosystemException exception) {
                    cb.invoke(gson.toJson(new Error(exception.getMessage(), exception.getCause())));
                }
            });
        } catch (ClientException exception) {
            cb.invoke(gson.toJson(new Error(exception.getMessage(), exception.getCause())));
        }
    }

    @ReactMethod
    public void payToUser(String offerJwt, Callback cb) {
        try {
            Kin.payToUser(offerJwt, new KinCallback<OrderConfirmation>() {
                @Override
                public void onResponse(OrderConfirmation orderConfirmation) {
                    cb.invoke(null, orderConfirmation.getJwtConfirmation());
                }

                @Override
                public void onFailure(KinEcosystemException exception) {
                    cb.invoke(gson.toJson(new Error(exception.getMessage(), exception.getCause())));
                }
            });
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }

    @ReactMethod
    public void getPublicAddress(Callback cb) {
        try {
            cb.invoke(null, Kin.getPublicAddress());
        } catch (ClientException e) {
            cb.invoke(gson.toJson(new Error(e.getMessage(), e.getCause())));
        }
    }
}
