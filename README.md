# Library Navigation

## Prerequisites

- Node version greater than 14  or latest

- Java SE Development Kit (JDK) - JDK11

- Android SDK

- Android Virtual Device(Emulator) or Android Physical Device

- React native command line interface

- React package manager(yarn)

- React native version used in project (0.68.0)


### Install node dependencies

Run `yarn install` to get all the project wide dependencies.

### Link few dependency

Run below commands in terminal

``` react-native link react-native-webview ```
``` react-native link react-native-camera ```
``` react-native link react-native-vector-icons ```


## How to set up

To build the application from terminal, run ```yarn react-native run-android```

To run the application in metro from terminal, run ```yarn react-native start```

To reload the app press ``` r```


## Get APK in below path

Step 1 : ``` npx mkdirp android/app/src/main/assets/ ```

Step 2: ```react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/ ```

Step 3: ```cd android/
./gradlew assembleDebug ```

Step 4: ``` android/app/build/outputs/apk/ ```

