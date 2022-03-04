/**
 * @generated SignedSource<<919a20b24f12628d7caa8f8ccdfecd67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCopyLinkButtonFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PostCopyLinkButtonFragment";
};
export type PostCopyLinkButtonFragment = PostCopyLinkButtonFragment$data;
export type PostCopyLinkButtonFragment$key = {
  readonly " $data"?: PostCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCopyLinkButtonFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "reference",
      "storageKey": null
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "3a61d26b67aae7d6dd167fd5d49f3db5";

export default node;
