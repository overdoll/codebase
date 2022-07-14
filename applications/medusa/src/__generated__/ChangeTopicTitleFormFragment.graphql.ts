/**
 * @generated SignedSource<<78a73d8a2b8fcd3e2230d3304981aa8f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicTitleFormFragment$data = {
  readonly id: string;
  readonly " $fragmentType": "ChangeTopicTitleFormFragment";
};
export type ChangeTopicTitleFormFragment$key = {
  readonly " $data"?: ChangeTopicTitleFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicTitleFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicTitleFormFragment",
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

(node as any).hash = "61e1d93a63fd16b1267c371be2c1cd4f";

export default node;
