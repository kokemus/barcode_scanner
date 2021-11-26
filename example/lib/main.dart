import 'package:flutter/material.dart';
import 'package:async/async.dart';
import 'package:barcode_scanner/barcode_scanner.dart';

void main() {
  runApp(App());
}

class App extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Barcode Scanner Demo',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatefulWidget {
  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  String _code = "";
  BarcodeScanner _scanner;
  bool _isFullscreenVideo = true;

  @override
  void initState() {
    _init();
    super.initState();
  }

  _init() async {
    _scanner = await BarcodeScannerFactory.create(BarcodeScannerOptions(
        formats: ['ean_13', 'qr_code'],
        video: _isFullscreenVideo
            ? null
            : VideoConstraints(width: 600, height: 200)));
  }

  void _scan() async {
    setState(() {
      _code = '';
    });
    final operation = CancelableOperation<String>.fromFuture(_scanner.scan(),
        onCancel: () => _scanner.cancel());
    operation.value.then((value) => setState(() {
          _code = value;
        }));
    Future.delayed(Duration(seconds: 15), () {
      operation.cancel();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Barcode Scanner Demo"),
        actions: [
          IconButton(
              onPressed: () {
                setState(() {
                  _isFullscreenVideo = !_isFullscreenVideo;
                });
                _init();
              },
              icon: Tooltip(
                message: 'Toggle video size',
                child: Icon(_isFullscreenVideo
                    ? Icons.fullscreen
                    : Icons.fullscreen_exit),
              ))
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              '$_code',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _scan,
        tooltip: 'Scan barcode',
        child: Icon(Icons.camera),
      ),
    );
  }
}
