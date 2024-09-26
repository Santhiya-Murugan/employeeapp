type asset = {
  assetId: number;
  assetName: string;
  assetCategory: AssetCategory;
  assetModel: string;
  assetDescription: string;
  assetValue: string;
  manufacturingDate: string;
  expiryDate: string;
  imageUrl: string;
  status: Status;
};

enum AssetCategory {
  Laptop,
  Furniture,
  Gadgets,
  Car,
}

enum Status {
  Available,
  Issued,
}

export { asset, AssetCategory, Status };
