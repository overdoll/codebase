/**
 * @generated SignedSource<<eb78f58ae344c1ed9da1946d62c69b59>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicWeightFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeTopicWeightFormFragment";
};
export type ChangeTopicWeightFormFragment$key = {
  readonly " $data"?: ChangeTopicWeightFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicWeightFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicWeightFormFragment",
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
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "86d0c583ccf8bb5762a9b827dacdf2fb";

export default node;
