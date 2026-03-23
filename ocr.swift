import Cocoa
import Vision

let args = CommandLine.arguments
guard args.count > 1 else {
    print("Please provide an image path.")
    exit(1)
}
let imagePath = args[1]
guard let image = NSImage(contentsOfFile: imagePath) else {
    print("Failed to load image.")
    exit(1)
}
guard let cgImage = image.cgImage(forProposedRect: nil, context: nil, hints: nil) else {
    print("Failed to cgImage.")
    exit(1)
}

let requestHandler = VNImageRequestHandler(cgImage: cgImage, options: [:])
let request = VNRecognizeTextRequest { (request, error) in
    guard let observations = request.results as? [VNRecognizedTextObservation] else {
        print("No text found")
        return
    }
    let text = observations.compactMap({ $0.topCandidates(1).first?.string }).joined(separator: "\n")
    print(text)
}
request.recognitionLanguages = ["en-US"]
try? requestHandler.perform([request])
