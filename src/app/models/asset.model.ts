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
type assetSeriveRequest = {
  serviceId: number;
  userId: number;
  firstName: string;
  assetId: number;
  assetName: string;
  serviceType: string;
  status: string;
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

export { asset, AssetCategory, Status, allocatedAsset, assetSeriveRequest };
