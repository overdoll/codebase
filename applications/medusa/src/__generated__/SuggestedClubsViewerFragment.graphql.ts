/**
 * @generated SignedSource<<cf4b35c980ff56ac0537da1dabc2e6ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SuggestedClubsViewerFragment$data = {
  readonly clubMembershipsCount: number;
  readonly " $fragmentSpreads": FragmentRefs<"JoinClubButtonViewerFragment">;
  readonly " $fragmentType": "SuggestedClubsViewerFragment";
};
export type SuggestedClubsViewerFragment = SuggestedClubsViewerFragment$data;
export type SuggestedClubsViewerFragment$key = {
  readonly " $data"?: SuggestedClubsViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"SuggestedClubsViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedClubsViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "1d708a8fc8c5ce2eb17c61422ac93e1d";

export default node;
