import { DecodeHintType, BarcodeFormat, NotFoundException, Result, Exception } from '@zxing/library/esm'
import { BrowserMultiFormatReader } from '@zxing/library/esm/browser/BrowserMultiFormatReader'

type BarcodeFormats =
  'code_39' |
  'code_128' |
  'data_matrix' |
  'ean_8' |
  'ean_13' |  
  'itf' |
  'pdf417' |
  'qr_code' |
  'rss_14'

type VideoConstraints = {
  width: number
  height: number 
}
  
type BarcodeScannerOptions = {
  beep?: boolean
  formats?: [BarcodeFormats]
  video?: VideoConstraints
}


class BarcodeScanner {
  private options: BarcodeScannerOptions
  private scanner: any
  private video: any
  private redLine: any
  private closeButton: any
  private codeReader: any

  constructor(options: BarcodeScannerOptions = {beep: false, video: null}) {
    this.options = options
    this.scanner = document.createElement('div')
    this.scanner.id = "barcode-scanner"
    this.scanner.style.width = '100vw'
    this.scanner.style.height = '100vh'
    this.scanner.style.position = 'absolute'
    this.scanner.style.top = '0'
    this.scanner.style.left = '0'
    this.scanner.style.backgroundColor = 'black'
    this.scanner.style.zIndex = '2147483647'
    this.scanner.style.display = 'none'

    this.video = document.createElement('video')
    if (this.options.video != null) {
      this.video.style.position = 'fixed'
      this.video.style.setProperty('top', `calc(50% - ${this.options.video.height / 2}px)`);
      this.video.style.setProperty('left', `calc(50% - ${this.options.video.width / 2}px)`);
      this.video.style.width = `${this.options.video.width}px`
      this.video.style.height = `${this.options.video.height}px`
    } else {
      this.video.style.width = '100%'
      this.video.style.height = '100%'
    }
    this.video.style.objectFit = 'cover'
    this.scanner.appendChild(this.video)

    this.redLine = document.createElement('div')
    this.redLine.style.height = '1px'
    this.redLine.style.backgroundColor = 'red'
    this.redLine.style.position = 'fixed'
    this.redLine.style.top = '50%'
    this.redLine.style.left = '25%'
    this.redLine.style.width = '50%'
    this.scanner.appendChild(this.redLine)

    this.closeButton = document.createElement('button')
    this.closeButton.innerHTML = '&#10005;'
    this.closeButton.style.position = 'fixed'
    this.closeButton.style.right = '16px'
    this.closeButton.style.bottom = '16px'
    this.closeButton.style.width = '56px'
    this.closeButton.style.height = '56px'
    this.closeButton.style.borderRadius = '60%'
    this.closeButton.style.fontSize = '20px'
    this.closeButton.style.border = 'none'
    this.closeButton.style.textDecoration = 'none'
    this.closeButton.style.backgroundColor = 'white'
    this.closeButton.style.outline = '0'
    this.closeButton.disabled = true
    this.closeButton.addEventListener('click', this.cancel.bind(this))
    this.scanner.appendChild(this.closeButton)

    document.body.appendChild(this.scanner)

    if (this.options.formats) {
      const formats = this.options.formats.map(f => {
          switch (f) {
            case 'code_39':
              return BarcodeFormat.CODE_39
            case 'code_128':
              return BarcodeFormat.CODE_128
            case 'data_matrix':
              return BarcodeFormat.DATA_MATRIX
            case 'ean_8':
              return BarcodeFormat.EAN_8
            case 'ean_13':
              return BarcodeFormat.EAN_13
            case 'itf':
              return BarcodeFormat.ITF
            case 'pdf417':
              return BarcodeFormat.PDF_417
            case 'qr_code':
              return BarcodeFormat.QR_CODE
            case 'rss_14':
              return BarcodeFormat.RSS_14
            default:
              return BarcodeFormat.QR_CODE
          }
        }
      )
      const hints = new Map()
      hints.set(DecodeHintType.POSSIBLE_FORMATS, formats)
      this.codeReader = new BrowserMultiFormatReader(hints)
    } else {
      this.codeReader = new BrowserMultiFormatReader()
    }
  }

  scan(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.show()
      this.codeReader.decodeFromVideoDevice(null, this.video, (result: Result, err: Exception) => {
        if (result) {
          if (this.options.beep) {
            this.beep()
          }
          this.cancel()
          resolve(result.getText())
        }
        if (err && !(err instanceof NotFoundException)) {
          this.cancel()
          reject(err)
        }
      }).catch((err: Error) => {
        this.cancel()
        reject(err)
      })
    })
  }

  cancel() {
    this.codeReader.reset()
    this.hide()
  }

  private show() {
    this.scanner.style.display = 'block'
    setTimeout(() => {
      this.closeButton.disabled = false
    }, 100)
  }

  private hide() {
    this.scanner.style.display = 'none'
    this.closeButton.disabled = true
  }

  private beep() {
    let sound = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=")
    sound.play()
  }
}

(window as any).BarcodeScanner = BarcodeScanner || {}