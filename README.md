# barcode_scanner

A barcode scanner for web. It provides simple Dart API for [zxing-js](https://github.com/zxing-js/library).

## Usage

```
dependencies:
  barcode_scanner:
    git:
      url: git://github.com/kokemus/barcode_scanner.git

```

### Example

#### Fullscreen video

``` dart
import 'package:barcode_scanner/barcode_scanner.dart';

BarcodeScanner scanner = await BarcodeScannerFactory.create(
  BarcodeScannerOptions(formats: ['ean_13', 'qr_code'])
);
final code = await scanner.scan();
```

#### Constrained video size

``` dart
import 'package:barcode_scanner/barcode_scanner.dart';

BarcodeScanner scanner = await BarcodeScannerFactory.create(
  BarcodeScannerOptions(
    formats: ['ean_13', 'qr_code'],
    video: VideoConstraints(width: 600, height: 200)
  )
);
final code = await scanner.scan();
```
