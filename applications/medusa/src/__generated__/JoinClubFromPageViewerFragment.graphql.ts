/**
 * @generated SignedSource<<4eb9cd8b77c3020a0355bd30b4779ff0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type JoinClubFromPageViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BecomeMemberButtonViewerFragment">;
  readonly " $fragmentType": "JoinClubFromPageViewerFragment";
};
export type JoinClubFromPageViewerFragment$key = {
  readonly " $data"?: JoinClubFromPageViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubFromPageViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "JoinClubFromPageViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BecomeMemberButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "0239a2ec84151ba82e22e6e6696fad53";

export default node;
