/**
 * @generated SignedSource<<c74608d5dca37ea2fa611c47217f0046>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostModerateButtonFragment$data = {
  readonly reference: string;
  readonly " $fragmentType": "PostModerateButtonFragment";
};
export type PostModerateButtonFragment$key = {
  readonly " $data"?: PostModerateButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostModerateButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostModerateButtonFragment",
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

(node as any).hash = "381c77ae82ceb8359153937179104b36";

export default node;
