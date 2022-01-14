/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomePostViewerFragment = {
    readonly " $fragmentRefs": FragmentRefs<"JoinClubButtonViewerFragment">;
    readonly " $refType": "HomePostViewerFragment";
};
export type HomePostViewerFragment$data = HomePostViewerFragment;
export type HomePostViewerFragment$key = {
    readonly " $data"?: HomePostViewerFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"HomePostViewerFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HomePostViewerFragment",
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
(node as any).hash = '2f5b7c8f50e41ebc1032bab18c98996c';
export default node;
