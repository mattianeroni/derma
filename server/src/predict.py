import torch
import torchvision.transforms as transforms

MODEL_PATH = "./src/model/skin-model.pt"

CLASSES_NAMES = {
    0 : 'acanthosis-nigricans',
    1 : 'acne',
    2 : 'acne-scars',
    3 : 'alopecia-areata',
    4 : 'dry',
    5 : 'melasma',
    6 : 'oily',
    7 : 'vitiligo',
    8 : 'warts'
}

CLASSES_DESCRIPTIONS = {
    0 : 'acanthosis-nigricans',
    1 : 'acne',
    2 : 'acne-scars',
    3 : 'alopecia-areata',
    4 : 'dry',
    5 : 'melasma',
    6 : 'oily',
    7 : 'vitiligo',
    8 : 'warts'
}


async def predict_image(img):
    """ Actual image classification """
    tr = transforms.Compose([
        transforms.Resize((512, 512)),
        transforms.ToTensor(),
    ])
    img_tensor = tr(img)

    model = torch.load(MODEL_PATH, map_location=torch.device('cpu'))
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    model.to(device)

    out = model(img_tensor.unsqueeze(0))
    pred, idx = torch.max(out, 1)

    return {
        "name" : CLASSES_NAMES[int(idx[0])],
        "desc" : CLASSES_DESCRIPTIONS[int(idx[0])],
        "accuracy" : pred[0],
    }