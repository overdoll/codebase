/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type BrandFragment = {
    readonly club: {
        readonly id: string;
    };
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
      "concreteType": "Club",
      "kind": "LinkedField",
      "name": "club",
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
(node as any).hash = '54bb0ea1bd88ec9e637b0af96cb2aadd';
export default node;
