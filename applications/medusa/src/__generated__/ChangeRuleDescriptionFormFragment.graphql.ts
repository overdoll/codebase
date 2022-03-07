/**
 * @generated SignedSource<<ae54c94e7d5a5d71698e870cb3b5b064>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleDescriptionFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeRuleDescriptionFormFragment";
};
export type ChangeRuleDescriptionFormFragment = ChangeRuleDescriptionFormFragment$data;
export type ChangeRuleDescriptionFormFragment$key = {
  readonly " $data"?: ChangeRuleDescriptionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDescriptionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleDescriptionFormFragment",
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

(node as any).hash = "8140ec964964079c955529ca2813b3c9";

export default node;
