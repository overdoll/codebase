/**
 * @generated SignedSource<<336c576ce53690f2e0e206df7f4a1440>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeCategoryTopicFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeCategoryTopicFormFragment";
};
export type ChangeCategoryTopicFormFragment$key = {
  readonly " $data"?: ChangeCategoryTopicFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeCategoryTopicFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeCategoryTopicFormFragment",
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

(node as any).hash = "ac4a8d26e6dfb4d8a1bb3d627927a732";

export default node;
