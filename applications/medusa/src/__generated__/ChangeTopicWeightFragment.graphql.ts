/**
 * @generated SignedSource<<4f55ad6e2b394bedd2ca164727336175>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeTopicWeightFragment$data = {
  readonly weight: number;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicWeightFormFragment">;
  readonly " $fragmentType": "ChangeTopicWeightFragment";
};
export type ChangeTopicWeightFragment$key = {
  readonly " $data"?: ChangeTopicWeightFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeTopicWeightFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeTopicWeightFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "weight",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeTopicWeightFormFragment"
    }
  ],
  "type": "Topic",
  "abstractKey": null
};

(node as any).hash = "c6d530d0cde6d61fe7a3cd35b246c493";

export default node;
