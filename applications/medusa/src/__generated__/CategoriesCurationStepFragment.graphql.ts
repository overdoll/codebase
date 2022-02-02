/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CategoriesCurationStepFragment = {
    readonly category: {
        readonly categories: ReadonlyArray<{
            readonly id: string;
            readonly title: string;
        }>;
    };
    readonly " $refType": "CategoriesCurationStepFragment";
};
export type CategoriesCurationStepFragment$data = CategoriesCurationStepFragment;
export type CategoriesCurationStepFragment$key = {
    readonly " $data"?: CategoriesCurationStepFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CategoriesCurationStepFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CategoriesCurationStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CategoryCurationProfile",
      "kind": "LinkedField",
      "name": "category",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Category",
          "kind": "LinkedField",
          "name": "categories",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};
(node as any).hash = '182203d2b95a3f85cf9d555247424286';
export default node;
