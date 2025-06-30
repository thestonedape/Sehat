import torch
import torch.nn as nn
from torchvision.models import resnet18

class SkinDiseaseModel(nn.Module):
    def __init__(self, num_classes=4):  # Adjust num_classes based on your dataset
        super(SkinDiseaseModel, self).__init__()
        self.model = resnet18(pretrained=False)
        self.model.fc = nn.Linear(self.model.fc.in_features, num_classes)

    def forward(self, x):
        return self.model(x)