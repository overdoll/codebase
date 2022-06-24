/**
 * @generated SignedSource<<4aa5342151ca5f8d223b217c832482d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment">;
  readonly " $fragmentType": "UploadFlowFooterFragment";
};
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

(node as any).hash = "6912d711114df27c502ac180a276085a";

export default node;
