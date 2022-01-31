/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FullDetailedPostViewerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    readonly " $refType": "FullDetailedPostViewerFragment";
};
export type FullDetailedPostViewerFragment$data = FullDetailedPostViewerFragment;
export type FullDetailedPostViewerFragment$key = {
    readonly " $data"?: FullDetailedPostViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FullDetailedPostViewerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullDetailedPostViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "JoinClubButtonViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};
(node as any).hash = '7150b0b00115b3f296fc3763b42ff910';
export default node;
