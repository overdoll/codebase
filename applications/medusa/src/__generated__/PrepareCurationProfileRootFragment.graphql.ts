/**
 * @generated SignedSource<<f3d3eae4fe68a79268cd8623765ca031>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrepareCurationProfileRootFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DiscoverClubsListFragment">;
  readonly " $fragmentType": "PrepareCurationProfileRootFragment";
};
export type PrepareCurationProfileRootFragment$key = {
  readonly " $data"?: PrepareCurationProfileRootFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrepareCurationProfileRootFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrepareCurationProfileRootFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscoverClubsListFragment"
    }
  ],
  "type": "Query",
  "abstractKey": null
};

(node as any).hash = "7106220942cbc7cfdff9d50f4c08bba4";

export default node;
