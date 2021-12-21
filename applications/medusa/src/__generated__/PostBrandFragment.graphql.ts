/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PostBrandFragment = {
    readonly brand: {
        readonly name: string;
        readonly thumbnail: {
            readonly " $fragmentRefs": FragmentRefs<"ResourceItemFragment">;
        } | null;
    } | null;
    readonly " $refType": "PostBrandFragment";
};
export type PostBrandFragment$data = PostBrandFragment;
export type PostBrandFragment$key = {
    readonly " $data"?: PostBrandFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"PostBrandFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostBrandFragment",
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
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Resource",
          "kind": "LinkedField",
          "name": "thumbnail",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ResourceItemFragment"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '03d31980c1a1e833c6c97f5d91cb3ede';
export default node;
