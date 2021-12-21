/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrandFragment = {
    readonly brand: {
        readonly id: string;
    } | null;
    readonly " $refType": "BrandFragment";
};
export type BrandFragment$data = BrandFragment;
export type BrandFragment$key = {
    readonly " $data"?: BrandFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"BrandFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BrandFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Brand",
      "kind": "LinkedField",
      "name": "brand",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '2b3291d01b90b18a73173b901f9adf3a';
export default node;
