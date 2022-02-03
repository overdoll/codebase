/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type UploadFlowFooterFragment = {
    readonly " $fragmentRefs": FragmentRefs<"UpdateContentButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "SubmitPostButtonFragment">;
    readonly " $refType": "UploadFlowFooterFragment";
};
export type UploadFlowFooterFragment$data = UploadFlowFooterFragment;
export type UploadFlowFooterFragment$key = {
    readonly " $data"?: UploadFlowFooterFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"UploadFlowFooterFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UploadFlowFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateContentButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateAudienceButton"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCategoryButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCharacterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmitPostButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '51b3f4d05c345fccbeea5ea0491b989d';
export default node;
