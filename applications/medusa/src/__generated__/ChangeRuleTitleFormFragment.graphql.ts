/**
 * @generated SignedSource<<54ac34a5a162cc31238d25a06ff25f45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeRuleTitleFormFragment";
};
export type ChangeRuleTitleFormFragment$key = {
  readonly " $data"?: ChangeRuleTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleTitleFormFragment",
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
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "3cc6a9312c606fa7fc4cf1e25221bb09";

export default node;
