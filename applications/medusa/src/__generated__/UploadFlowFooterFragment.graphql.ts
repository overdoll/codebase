/**
 * @generated SignedSource<<10b3f25b12e43ec52b30d962f504a701>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "SubmitPostButtonFragment">;
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
