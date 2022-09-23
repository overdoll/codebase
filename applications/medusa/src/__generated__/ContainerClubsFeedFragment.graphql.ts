/**
 * @generated SignedSource<<1224fa48af5b4bb4c63597bb2b592b2b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ContainerClubsFeedFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HeaderClubsFeedFragment">;
  readonly " $fragmentType": "ContainerClubsFeedFragment";
};
export type ContainerClubsFeedFragment$key = {
  readonly " $data"?: ContainerClubsFeedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ContainerClubsFeedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ContainerClubsFeedFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HeaderClubsFeedFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "9a570a733cc9a0f00abc115ce25c8033";

export default node;
