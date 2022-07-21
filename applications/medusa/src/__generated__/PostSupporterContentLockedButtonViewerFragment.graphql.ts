/**
 * @generated SignedSource<<025f422f970b03cd90577437a4693bc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedButtonViewerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ClubSupportPostConditionWrapperViewerFragment">;
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
      "name": "ClubSupportPostConditionWrapperViewerFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "82035bbb42bf740a19fa36cf8e2b3048";

export default node;
