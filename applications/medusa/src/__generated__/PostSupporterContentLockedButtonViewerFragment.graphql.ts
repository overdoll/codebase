/**
 * @generated SignedSource<<22046c93484f8c61041eea96294fcb31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportConditionWrapperViewerFragment">;
  readonly " $fragmentType": "PostSupporterContentLockedButtonViewerFragment";
};
export type PostSupporterContentLockedButtonViewerFragment$key = {
  readonly " $data"?: PostSupporterContentLockedButtonViewerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedButtonViewerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedButtonViewerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClubSupportConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "d839f65eea8938f82b4ff6186055a2c8";

export default node;
