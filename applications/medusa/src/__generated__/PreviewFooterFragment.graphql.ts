/**
 * @generated SignedSource<<171963ff384633e39723dfde7768a0dc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PreviewFooterFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"MenuSimplePublicPostFragment" | "PostLikeButtonFragment">;
  readonly " $fragmentType": "PreviewFooterFragment";
};
export type PreviewFooterFragment$key = {
  readonly " $data"?: PreviewFooterFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"PreviewFooterFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PreviewFooterFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLikeButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MenuSimplePublicPostFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "03df08d80b20d0bd7e3ae15cb138b1d6";

export default node;
