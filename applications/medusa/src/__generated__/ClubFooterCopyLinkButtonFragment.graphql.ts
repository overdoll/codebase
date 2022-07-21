/**
 * @generated SignedSource<<4e00947f732e598040dea51a1bfd844c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClubFooterCopyLinkButtonFragment$data = {
  readonly slug: string;
  readonly " $fragmentType": "ClubFooterCopyLinkButtonFragment";
};
export type ClubFooterCopyLinkButtonFragment$key = {
  readonly " $data"?: ClubFooterCopyLinkButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClubFooterCopyLinkButtonFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClubFooterCopyLinkButtonFragment",
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

(node as any).hash = "f3785475b15e94bcc05d21a00527efc3";

export default node;
