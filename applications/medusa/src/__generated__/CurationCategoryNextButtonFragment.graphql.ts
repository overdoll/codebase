/**
 * @generated SignedSource<<2131fb62332396e5be03fe3908815848>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurationCategoryNextButtonFragment$data = {
  readonly categories: ReadonlyArray<{
    readonly id: string;
  }>;
  readonly " $fragmentType": "CurationCategoryNextButtonFragment";
};
export type CurationCategoryNextButtonFragment$key = {
  readonly " $data"?: CurationCategoryNextButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"CurationCategoryNextButtonFragment">;
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

(node as any).hash = "0c0d628b3427ae172b53c388f7eb5ef2";

export default node;
