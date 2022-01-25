/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReviewFragment = {
    readonly " $fragmentRefs": FragmentRefs<"PostReviewFragment">;
    readonly " $refType": "ReviewFragment";
};
export type ReviewFragment$data = ReviewFragment;
export type ReviewFragment$key = {
    readonly " $data"?: ReviewFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"ReviewFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReviewFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostReviewFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'b9fffff9ef7f5f561b9e36dd4f583688';
export default node;
