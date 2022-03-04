/**
 * @generated SignedSource<<f8184a57fa4c13c90b5daae92b82bf82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCopyLinkButtonFragment$data = {
  readonly username: string;
  readonly " $fragmentType": "ProfileCopyLinkButtonFragment";
};
export type ProfileCopyLinkButtonFragment = ProfileCopyLinkButtonFragment$data;
export type ProfileCopyLinkButtonFragment$key = {
  readonly " $data"?: ProfileCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCopyLinkButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "b36842b8620637a9a9bc31b9fec0130b";

export default node;
