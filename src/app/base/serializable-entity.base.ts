export interface SerializableEntity {
  fromJson(obj: {}): void;
  toJson?(obj: {}): void;
}
