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
type allocatedAsset = {
  requestId: number;
  adminId: number;
  userId: number;
  firstName: string;
  assetId: number;
  assetName: string;
  issuedDate: string;
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

export { asset, AssetCategory, Status, allocatedAsset };
