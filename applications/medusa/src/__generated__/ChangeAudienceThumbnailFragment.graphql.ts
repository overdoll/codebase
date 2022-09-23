/**
 * @generated SignedSource<<63c11adf2ffbb7c14894638393056b75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceThumbnailFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AudienceIconFragment" | "ChangeAudienceThumbnailFormFragment">;
  readonly " $fragmentType": "ChangeAudienceThumbnailFragment";
};
export type ChangeAudienceThumbnailFragment$key = {
  readonly " $data"?: ChangeAudienceThumbnailFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceThumbnailFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceThumbnailFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AudienceIconFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeAudienceThumbnailFormFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "d6b80e05bb14ee9c5671a19d950a3280";

export default node;
