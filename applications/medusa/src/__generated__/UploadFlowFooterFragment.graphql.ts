/**
 * @generated SignedSource<<a5195c0021c9f491f4a7cb9558998327>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UploadFlowFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButtonFragment" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "UpdateContentButtonFragment">;
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
      "name": "UpdateAudienceButtonFragment"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateContentButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "73e10a2fafa39e0acf1ceee8c083c6a8";

export default node;
