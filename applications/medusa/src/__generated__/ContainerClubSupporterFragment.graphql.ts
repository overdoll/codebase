/**
 * @generated SignedSource<<ebd9f1c4a4b28fc596ebba6719ba573e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerClubSupporterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderClubSupporterFragment">;
  readonly " $fragmentType": "ContainerClubSupporterFragment";
};
export type ContainerClubSupporterFragment$key = {
  readonly " $data"?: ContainerClubSupporterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerClubSupporterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerClubSupporterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderClubSupporterFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "ce817f3902524f154eff63c6cc5b14bc";

export default node;
