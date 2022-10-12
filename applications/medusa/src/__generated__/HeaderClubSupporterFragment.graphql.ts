/**
 * @generated SignedSource<<fa834212507a8cb26ec4f718a93b8984>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HeaderClubSupporterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportLinksFragment">;
  readonly " $fragmentType": "HeaderClubSupporterFragment";
};
export type HeaderClubSupporterFragment$key = {
  readonly " $data"?: HeaderClubSupporterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"HeaderClubSupporterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HeaderClubSupporterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportLinksFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "d6ebe74e5adc3d48e538e71760e66587";

export default node;
