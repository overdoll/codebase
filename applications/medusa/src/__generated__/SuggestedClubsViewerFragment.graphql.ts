/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SuggestedClubsViewerFragment = {
    readonly clubMembershipsCount: number;
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    readonly " $refType": "SuggestedClubsViewerFragment";
};
export type SuggestedClubsViewerFragment$data = SuggestedClubsViewerFragment;
export type SuggestedClubsViewerFragment$key = {
    readonly " $data"?: SuggestedClubsViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"SuggestedClubsViewerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SuggestedClubsViewerFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "clubMembershipsCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '1d708a8fc8c5ce2eb17c61422ac93e1d';
export default node;
