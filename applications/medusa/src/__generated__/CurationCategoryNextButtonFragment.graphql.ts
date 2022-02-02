/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CurationCategoryNextButtonFragment = {
    readonly categories: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly " $refType": "CurationCategoryNextButtonFragment";
};
export type CurationCategoryNextButtonFragment$data = CurationCategoryNextButtonFragment;
export type CurationCategoryNextButtonFragment$key = {
    readonly " $data"?: CurationCategoryNextButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"CurationCategoryNextButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CurationCategoryNextButtonFragment",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CategoryCurationProfile",
  "abstractKey": null
};
(node as any).hash = '0c0d628b3427ae172b53c388f7eb5ef2';
export default node;
