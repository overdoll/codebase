/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FullSimplePostViewerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    readonly " $refType": "FullSimplePostViewerFragment";
};
export type FullSimplePostViewerFragment$data = FullSimplePostViewerFragment;
export type FullSimplePostViewerFragment$key = {
    readonly " $data"?: FullSimplePostViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FullSimplePostViewerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FullSimplePostViewerFragment",
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
(node as any).hash = '35c3abf41b4d3ea739a15ae6e78f0efc';
export default node;
