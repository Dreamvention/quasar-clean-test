# iOS

Domino's AUS App is built on Capacitor. It has 3 Environments that it can be deployed to: DEV, UAT and PROD. We mostly build DEV and PROD but when the app goes live, we will be required to build UAT as well.

#### credentials

All credentials can be requested from [dmitriy.zhuk@cosocloud.com](mailto:dmitriy.zhuk@cosocloud.com)

## Setup requirments

- VScode
- Access to `dominos-australia/js/mobile` Git repo
- Xcode
- Coso Apple Dev Credentials `wesley.peters@cosocloud.com` and `PASSWORD` ([credentials](#credentials))

## Setup VScode

1. Clone `dominos-australia` repo
2. In your VScode open folder `../dominos-australia/js/mobile`
3. In terminal run command `npm i` to install all dependencies
4. In terminal run command `npm run build:debug:ios` to build your first app and to initialize `Xcode`

## Setup Xcode

> after running `npm run build:debug:ios` you should have Xcode opened with you project

1. in xcode select in left column click on `app` to open `App project menu`
2. in opened window select tab `signing and capabilities`
3. in the teams select `add an account`
4. input your apple id `wesley.peters@cosocloud.com`
5. enter password `PASSWORD`
6. in opened window select under team `Coso Cloud LLC` and click download Manual Profiles
7. You should see a list of certifications when click `manage certifications`

## Build 

> Dominos AUS has three environments: Dev, UAT and Prod.
> The `Dev` env uses `Coso Cloud LLC` and is build by running `npm run build:debug:ios`
> The `Prod` and `UAT` env uses `Domino's Pizza Enterprizes Limited` and is build by `npm run build:prod:ios` or `npm run build:uat:ios`

**Important! By default we always build apps in DEV environemnt (debug) for testflight**

1. In VScode terminal run command `npm run build:debug:ios` (DEV)
2. Wait untill the app builds and Xcode opens. this may take a minute.
3. In `App project menu` under `general` tab find `Build` input and increase the Version by +1
4. If you are need, also increase the `version` input as requested by the Product manager
5. In `Menu > Product` select `Clear build folder`.

**Important! If build folder not cleared, it might conflict with Dev and Prod environments**

6. in top bar where you see `APP > iPhone ...` you must switch to `Any iOS Device`
7. in `Menu > Product` select `Build`

## Deploy

1. in `Menu > Product` select `Archive`

**Important! You will not see Arhcive active if you didn't swithc to build Any iOS Device**

2. in new window click `Distribute App`
3. in next new widnow select `App store connect` and click next.
4. in next new window select next.
5. Log in to App Store Connect with Coso Credentials
6. Select the right Account by clicking top right corner next to Wesly Peters

> Select `Coso Cloud LLC` for `DEV`
> Select `Domino's Pizza Enterprizes Limited` for `PROD` or `UAT`

6. Select `My Apps`
7. Select `DominosAUS` app
8. go to `TestFlight` tab
9. Locate your latest build which should have `Manage Complicance` and `Manage` written
10. Click on `Manage` and select `NO` then `Start interlnal testing`
11. Go into the app by clicking on the version name.
12. Next to `Group` click on `plus` and select `External Testing`. click next
13. In `What to test` textarea write the Environment and items to test if avaliable.

```md
DEV env

- bug fix of avatar
- new feature for map
```

and click `Save`

> The Testers should receive a notification that a new version is avaliable.

### Log in to Apple Store Connect

1. Go to App store Connect `https://appstoreconnect.apple.com/`
2. Enter `wesley.peters@cosocloud.com` and `PASSWORD` with Coso Credentials
3. When offered to put in code select `didn't get the code`
4. Select option to send to a phone
5. Seledt phone number that ends with `**19`
6. Ask `dmitriy.zhuk@cosocloud.com` to provide the code.
7. Select `Trust`
