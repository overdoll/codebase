/**
 * @generated SignedSource<<a70c59606ce04e57bf5b42aacb6605f0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostSupporterContentLockedFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "PostSupporterContentLockedFragment";
};
export type PostSupporterContentLockedFragment$key = {
  readonly " $data"?: PostSupporterContentLockedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostSupporterContentLockedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostSupporterContentLockedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    }
  ],
  "type": "Club",
  "abstractKey": null
};

(node as any).hash = "afc2a31770ea289709dbfd846a7ae335";

export default node;
