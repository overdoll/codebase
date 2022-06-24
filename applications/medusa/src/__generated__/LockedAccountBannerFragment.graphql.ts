/**
 * @generated SignedSource<<424b3c31949e4e3e444fe735ce0ec14f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LockedAccountBannerFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"LockedAccountModalFragment">;
  readonly " $fragmentType": "LockedAccountBannerFragment";
};
export type LockedAccountBannerFragment$key = {
  readonly " $data"?: LockedAccountBannerFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"LockedAccountBannerFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LockedAccountBannerFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "LockedAccountModalFragment"
    }
  ],
  "type": "Account",
  "abstractKey": null
};

(node as any).hash = "25c3493b4bec50a62be404e742515768";

export default node;
