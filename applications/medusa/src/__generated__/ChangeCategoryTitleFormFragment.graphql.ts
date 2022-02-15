/**
 * @generated SignedSource<<9699c5deacec56874e0479d6ea8f0095>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCategoryTitleFormFragment";
};
export type ChangeCategoryTitleFormFragment = ChangeCategoryTitleFormFragment$data;
export type ChangeCategoryTitleFormFragment$key = {
  readonly " $data"?: ChangeCategoryTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryTitleFormFragment",
  "selections": [
    {
      "kind": "RequiredField",
      "field": {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      "action": "THROW",
      "path": "id"
    }
  ],
  "type": "Category",
  "abstractKey": null
};

(node as any).hash = "5f867e97bdaabd0795aedc0daf399aaf";

export default node;
