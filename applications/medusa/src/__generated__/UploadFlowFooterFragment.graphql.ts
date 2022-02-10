/**
 * @generated SignedSource<<1e3cedaa3785cffa4b24d77595b904ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UpdateContentButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "SubmitPostButtonFragment">;
  readonly " $fragmentType": "UploadFlowFooterFragment";
};
export type UploadFlowFooterFragment = UploadFlowFooterFragment$data;
export type UploadFlowFooterFragment$key = {
  readonly " $data"?: UploadFlowFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UploadFlowFooterFragment">;
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

(node as any).hash = "51b3f4d05c345fccbeea5ea0491b989d";

export default node;
